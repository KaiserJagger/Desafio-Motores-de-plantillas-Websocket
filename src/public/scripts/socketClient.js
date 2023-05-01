const socketClient = io();

const forms = document.querySelectorAll("form");
forms.forEach((form) => {
    form.addEventListener("submit", (ev) => {
        ev.preventDefault();
        console.log(ev.currentTarget.id.value);
        socketClient.emit("deleteProd", ev.currentTarget.id.value);
    });
});
socketClient.on("products", (productos) => {
    let innerHtml = ""
    productos.forEach((producto) => {
        innerHtml += `
        <div id="product${producto.id}">
        <h4>${producto.title}</h4>
        <img
        src="https://sinteplastconstruccion.com.ar/assets/img/sinteplastconstruccion.com.ar/photos/w300/${producto.thumbnails}"
        alt="foto producto"
                width="100"
            />
            <p>${producto.description}</p>
            <p>Precio: $${producto.price}</p>
            <p>Categoría: ${producto.category}</p>
            <p>Imagen: ${producto.thumbnails}</p>
            <p>Status: ${producto.status}</p>
            <p>Código: ${producto.code}</p>
            <p>Stock: ${producto.stock}</p>
            <form>
            <input type="hidden" name="id" value="${producto.id}"/>
            <button type="submit">Borrar este producto</button>
            </form>
            </div>
            `
        });
        document.querySelector('#realtimeproducts').innerHTML = innerHtml
        const forms = document.querySelectorAll("form");
        forms.forEach((form) => {
            form.addEventListener("submit", (ev) => {
                ev.preventDefault();
                console.log(ev.currentTarget.id.value);
                socketClient.emit("deleteProd", ev.currentTarget.id.value);
            });
        });
    });
    