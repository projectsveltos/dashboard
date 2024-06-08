# Image URL to use all building/pushing image targets
IMG ?= controller:latest
# KUBEBUILDER_ENVTEST_KUBERNETES_VERSION refers to the version of kubebuilder assets to be downloaded by envtest binary.
KUBEBUILDER_ENVTEST_KUBERNETES_VERSION = 1.30.0

# Setting SHELL to bash allows bash commands to be executed by recipes.
# This is a requirement for 'setup-envtest.sh' in the test target.
# Options are set to exit when a recipe line exits non-zero or a piped command fails.
SHELL = /usr/bin/env bash -o pipefail
.SHELLFLAGS = -ec

# Define Docker related variables.
REGISTRY ?= projectsveltos
IMAGE_NAME ?= dashboard
ARCH ?= amd64
OS ?= $(shell uname -s | tr A-Z a-z)
export CONTROLLER_IMG ?= $(REGISTRY)/$(IMAGE_NAME)
TAG ?= dev

.PHONY: all
all: build

.PHONY: docker-build
docker-build: ## Build docker image with the manager.
	docker build --load --build-arg VITE_BACKEND_PORT="80" --build-arg  VITE_BACKEND_NAME="ui-backend-manager" --build-arg  BUILDOS=linux --build-arg TARGETARCH=amd64 -t $(CONTROLLER_IMG):$(TAG) .

.PHONY: docker-buildx
docker-buildx: ## docker build for multiple arch and push to docker hub
	docker buildx build --push --platform linux/amd64,linux/arm64 -t $(CONTROLLER_IMG):$(TAG) .


