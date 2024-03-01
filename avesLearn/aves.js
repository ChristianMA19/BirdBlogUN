import { ClarifaiStub, grpc } from "clarifai-nodejs-grpc";

export default async function aves(url) {
    const PAT = '633c609242c4477caa024f53995fcf9b';
    const USER_ID = 'christianma18';
    const APP_ID = 'prueba';
    const MODEL_ID = 'general-image-recognition';
    const MODEL_VERSION_ID = 'aa7f35c01e0642fda5cf400f543e7c40';
    const IMAGE_URL = url;
    let photoBird = false;

    const stub = ClarifaiStub.grpc();
    const metadata = new grpc.Metadata();
    metadata.set("authorization", "Key " + PAT);

    // Creamos una promesa para encapsular la llamada asincrónica
    return new Promise((resolve, reject) => {
        stub.PostModelOutputs(
            {
                user_app_id: {
                    "user_id": USER_ID,
                    "app_id": APP_ID
                },
                model_id: MODEL_ID,
                version_id: MODEL_VERSION_ID,
                inputs: [
                    { data: { image: { url: IMAGE_URL, allow_duplicate_url: true } } }
                ]
            },
            metadata,
            (err, response) => {
                if (err) {
                    reject(err); // Si hay un error, rechazamos la promesa
                } else {
                    if (response.status.code !== 10000) {
                        reject("Post model outputs failed, status: " + response.status.description);
                    } else {
                        const output = response.outputs[0];
                        for (const concept of output.data.concepts) {
                            //console.log(concept.name + " " + concept.value);
                            if (concept.name == "bird" && concept.value >= 0.95) {
                                photoBird = true;
                                break;
                            }
                        }
                        resolve(photoBird); // Resolvemos la promesa con el valor de photoBird
                    }
                }
            }
        );
    });
}
