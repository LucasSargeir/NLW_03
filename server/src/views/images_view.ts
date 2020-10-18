import Image from '../models/Image';

export default{
    render(image: Image){

        return {
            id: image.id,
            url: `http://192.168.15.7:7777/uploads/${image.path}`
        }

    },
    
    renderMany(image: Image[]){

        return image.map((i)=>this.render(i))

    }

}