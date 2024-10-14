# Image URL to use all building/pushing image targets
IMG ?= controller:latest
# KUBEBUILDER_ENVTEST_KUBERNETES_VERSION refers to the version of kubebuilder assets to be downloaded by envtest binary.
KUBEBUILDER_ENVTEST_KUBERNETES_VERSION = 1.31.0

# Setting SHELL to bash allows bash commands to be executed by recipes.
# This is a requirement for 'setup-envtest.sh' in the test target.
# Options are set to exit when a recipe line exits non-zero or a piped command fails.
SHELL = /usr/bin/env bash -o pipefail
.SHELLFLAGS = -ec

# Define Docker related variables.
REGISTRY ?= projectsveltos
IMAGE_NAME ?= dashboard
ARCH ?= $(shell go env GOARCH)
OS ?= $(shell uname -s | tr A-Z a-z)
export CONTROLLER_IMG ?= $(REGISTRY)/$(IMAGE_NAME)
TAG ?= v0.40.0

# Directories.
TOOLS_DIR := hack/tools
BIN_DIR := bin
TOOLS_BIN_DIR := $(abspath $(TOOLS_DIR)/$(BIN_DIR))

GOBUILD=go build

KIND := $(TOOLS_BIN_DIR)/kind

$(KIND): $(TOOLS_DIR)/go.mod
	cd $(TOOLS_DIR) && $(GOBUILD) -tags tools -o $(subst $(TOOLS_DIR)/hack/tools/,,$@) sigs.k8s.io/kind

CONTROL_CLUSTER_NAME ?= sveltos-management

##@ General

# The help target prints out all targets with their descriptions organized
# beneath their categories. The categories are represented by '##@' and the
# target descriptions by '##'. The awk commands is responsible for reading the
# entire set of makefiles included in this invocation, looking for lines of the
# file as xyz: ## something, and then pretty-format the target and help. Then,
# if there's a line with ##@ something, that gets pretty-printed as a category.
# More info on the usage of ANSI control characters for terminal formatting:
# https://en.wikipedia.org/wiki/ANSI_escape_code#SGR_parameters
# More info on the awk command:
# http://linuxcommand.org/lc3_adv_awk.php

.PHONY: help
help: ## Display this help.
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_0-9-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

.PHONY: docker-build
docker-build: ## Build docker image with the manager.
	docker build --load --build-arg VITE_APP_VERSION=0.0.1 --build-arg VITE_BACKEND_PORT="80" --build-arg  VITE_BACKEND_NAME="ui-backend-manager" --build-arg  BUILDOS=linux --build-arg TARGETARCH=amd64 -t $(CONTROLLER_IMG):$(TAG) .

.PHONY: docker-buildx
docker-buildx: ## docker build for multiple arch and push to docker hub.
	docker buildx build --build-arg VITE_APP_VERSION=0.0.1 --build-arg VITE_BACKEND_PORT="80" --build-arg  VITE_BACKEND_NAME="ui-backend-manager" --push --platform linux/amd64,linux/arm64 -t $(CONTROLLER_IMG):$(TAG) .

.PHONY: load-image
load-image: docker-build $(KIND)
	$(KIND) load docker-image $(CONTROLLER_IMG):$(TAG) --name $(CONTROL_CLUSTER_NAME)

.PHONY: manifests
manifests: ## Generate manifests
	MANIFEST_IMG=$(CONTROLLER_IMG) MANIFEST_TAG=$(TAG) $(MAKE) set-manifest-image

set-manifest-image:
	sed -i'' -e 's@image: .*@image: '"docker.io/${MANIFEST_IMG}:$(MANIFEST_TAG)"'@' ./manifest/manifest.yaml >> ./manifest/manifest.yaml-e
