const modelViewer = document.querySelector("model-viewer#pickMaterial");
    
    modelViewer.addEventListener("load", () => {
      const changeColor = (event) => {
        const material = modelViewer.materialFromPoint(event.clientX, event.clientY);
        if (material != null) {
          material.pbrMetallicRoughness.
            setBaseColorFactor([Math.random(), Math.random(), Math.random()]);
        }
      };
    
      modelViewer.addEventListener("click", changeColor);
    });