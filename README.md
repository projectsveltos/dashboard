[![Slack](https://img.shields.io/badge/join%20slack-%23projectsveltos-brighteen)](https://join.slack.com/t/projectsveltos/shared_invite/zt-1hraownbr-W8NTs6LTimxLPB8Erj8Q6Q)
[![License](https://img.shields.io/badge/license-Apache-blue.svg)](LICENSE)
[![Twitter Follow](https://img.shields.io/twitter/follow/projectsveltos?style=social)](https://twitter.com/projectsveltos)

<img alt="sveltosUI" src="https://raw.githubusercontent.com/projectsveltos/sveltos/main/docs/assets/logo.png" width="200">

Please refere to sveltos [documentation](https://projectsveltos.github.io/sveltos/).

## What this repository is

This repo contains the source code for Sveltos Dashboard User Interface

[![Sveltos Dashboard](https://img.youtube.com/vi/FjFtvrG8LWQ/0.jpg)](https://www.youtube.com/watch?v=FjFtvrG8LWQ)

## Getting Started

Run the following command to deploy the Sveltos dashboard using kubectl:

```
$ kubectl apply -f https://raw.githubusercontent.com/projectsveltos/sveltos/main/manifest/dashboard-manifest.yaml
```

To access the dashboard, you'll need to expose the dashboard service in the projectsveltos namespace. Currently, it's configured as a ClusterIP service, which limits access to within the cluster. To expose it externally, you can either change the service type to LoadBalancer or utilize an Ingress/Gateway API.

Refer to the [documentation](https://projectsveltos.github.io/sveltos/getting_started/optional/dashboard/) for more information.

## Contributing

❤️ Your contributions are always welcome! If you want to contribute, have questions, noticed any bug or want to get the latest project news, you can connect with us in the following ways:

1. Open a bug/feature enhancement on github [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/projectsveltos/dashboard/issues)
2. Chat with us on the Slack in the #projectsveltos channel [![Slack](https://img.shields.io/badge/join%20slack-%23projectsveltos-brighteen)](https://join.slack.com/t/projectsveltos/shared_invite/zt-1hraownbr-W8NTs6LTimxLPB8Erj8Q6Q)
3. [Contact Us](mailto:support@projectsveltos.io)

## License

Copyright 2024.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
