import { useState } from 'react'
import formStyle from './Form.module.css'
import Input from './Input'
import Select from './Select'

function PetForm({ handleSubmit, petData, btnText }) {
    const [pet, setPet] = useState(petData || {})
    const [preview, setPreview] = useState([])
    const colors = ['Branco', 'Preto', 'Caramelo', 'Cinza', 'Mesclado']

    function onFileChange(e) {
        console.log(e.target.files)
        setPreview(Array.from(e.target.files))
        setPet({ ...pet, images: [...e.target.files] })
    }
    function handleChange(e) {
        setPet({ ...pet, [e.target.name]: e.target.value })
    }
    function handleColor(e) {
        setPet({ ...pet, color: e.target.options[e.target.selectedIndex].text })
    }

    function submit(e) {
        e.preventDefault()
        console.log(pet)
        handleSubmit(pet)
    }

    return (
        <form onSubmit={submit} className={formStyle.form_container}>
            <div className={formStyle.preview_pet_images}>
                {preview.length > 0
                    ? preview.map((image, index) => (
                          <img
                              src={URL.createObjectURL(image)}
                              alt={pet.name}
                              key={`${pet.name} + ${index}`}
                          />
                      ))
                    : pet.images &&
                      pet.images.map((image, index) => (
                          <img
                              src={`${process.env.REACT_APP_API}/images/pets/${image}`}
                              alt={pet.name}
                              key={`${pet.name} + ${index}`}
                          />
                      ))}
            </div>
            <Input
                text="Imagens do Pet"
                type="file"
                name="images"
                handleOnChange={onFileChange}
                multiple={true}
            />
            <Input
                text="Nome do Pet"
                type="text"
                name="name"
                placeholder="Informe o nome do pet."
                handleOnChange={handleChange}
                value={pet.name || ''}
            />
            <Input
                text="Idade do Pet"
                type="text"
                name="age"
                placeholder="Informe a idade do pet."
                handleOnChange={handleChange}
                value={pet.age || ''}
            />
            <Input
                text="Peso do Pet"
                type="number"
                name="weight"
                placeholder="Informe o peso do pet."
                value={pet.weight || ''}
                handleOnChange={handleChange}
            />
            <Select
                name="color"
                text="Selecione a cor"
                options={colors}
                handleOnChange={handleColor}
                value={pet.color || ''}
            />
            <input type="submit" value={btnText} />
        </form>
    )
}
export default PetForm
