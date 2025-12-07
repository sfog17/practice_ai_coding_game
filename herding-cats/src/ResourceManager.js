export class ResourceManager {
    constructor() {
        this.images = {};
    }

    loadImages(imagePaths) {
        const promises = Object.keys(imagePaths).map(key => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    this.images[key] = img;
                    resolve();
                };

                img.onerror = (e) => {
                    console.error(`Failed to load image: ${imagePaths[key]}`, e);
                    // Resolve anyway to avoid crashing everything
                    resolve();
                };
                img.src = imagePaths[key];
            });
        });

        return Promise.all(promises);
    }

    getImage(key) {
        return this.images[key];
    }
}
