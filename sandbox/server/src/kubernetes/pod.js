import { k8sCoreV1Api } from "./config.js";

export async function createPod(sandboxId) {
    const podManifest = {
        metadata: {
            name: `sandbox-pod-${sandboxId}`,
            labels: {
                app: 'sandbox',
                sandboxId: sandboxId
            }
        },
        spec: {
            containers: [
                {
                    image: "template:v2",
                    imagePullPolicy: 'IfNotPresent',
                    name: "sandbox-container",
                    ports: [
                        {
                            containerPort: 5173, name: "http"
                        }
                    ],
                    resources: {
                        requests: {
                            memory: "250Mi",
                            cpu: "500m"
                        },
                        limits: {
                            memory: "500Mi",
                            cpu: "1Gi"
                        }
                    }
                }
            ]
        }
    }

    const response = await k8sCoreV1Api.createNamespacedPod({
        namespace: "default",
        body: podManifest
    })

    return response;
}