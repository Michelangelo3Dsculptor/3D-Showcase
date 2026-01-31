async function loadGallery() {
    const scene = document.querySelector('a-scene');
    const galleryContainer = document.getElementById('gallery-container');

    try {
        const response = await fetch('gallery.json');
        const items = await response.json();

        if (items.length === 0) {
            const noItemsText = document.createElement('a-text');
            noItemsText.setAttribute('value', 'The studio is preparing. New works coming soon.');
            noItemsText.setAttribute('position', '-2.5 1.6 -2');
            noItemsText.setAttribute('color', '#FFFFFF');
            galleryContainer.appendChild(noItemsText);
            return;
        }

        const columns = 3;
        const spacing = 4;
        const startX = -((columns - 1) * spacing) / 2;
        
        items.forEach((item, index) => {
            const x = startX + (index % columns) * spacing;
            const z = -Math.floor(index / columns) * spacing;

            const modelEntity = document.createElement('a-entity');
            
            // The 3D model
            const gltfModel = document.createElement('a-gltf-model');
            gltfModel.setAttribute('src', item.filePath);
            gltfModel.setAttribute('position', '0 1.5 0');
            gltfModel.setAttribute('scale', '1 1 1');
            gltfModel.setAttribute('animation__rotation', {
                property: 'rotation',
                to: '0 360 0',
                loop: true,
                dur: 10000,
                easing: 'linear'
            });

            // The title text
            const titleText = document.createElement('a-text');
            titleText.setAttribute('value', item.title);
            titleText.setAttribute('position', '0 0.5 0');
            titleText.setAttribute('align', 'center');
            titleText.setAttribute('color', '#FFFFFF');
            titleText.setAttribute('width', '4');

            modelEntity.appendChild(gltfModel);
            modelEntity.appendChild(titleText);
            modelEntity.setAttribute('position', `${x} 0 ${z}`);
            galleryContainer.appendChild(modelEntity);
        });

    } catch (error) {
        console.error('Could not load A-Frame gallery:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadGallery);
