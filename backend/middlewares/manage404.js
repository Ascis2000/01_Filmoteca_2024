
// ultima ruta por defecto. 
// En el caso de no encontrarse ninguna ruta, devolvemos un 404
const manage404 = (req,res) => {
    res.status(404).json({
        msj:"404 not found",
        img:"/assets/img/404_image.jpg"
        //img:"https://seranking.com/blog/wp-content/uploads/2021/01/404_01-min.jpg"
    });
}

module.exports = manage404;