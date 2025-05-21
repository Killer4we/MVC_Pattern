import {react,useState} from 'react';
import {useForm} from 'react-hook-form';

const CreateListing = () =>{
    const [disable,isDisable] = useState(false);
    const [formData,setFormData] = useState({});
    const { register, handleSubmit, formState: { errors } } = useForm();


    async function onSubmit(data){
        // console.log(data);
        isDisable(true);
        // console.log(formData);
        try{
            const response = await fetch('/api/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), 
        });

        if (!response.ok) {
            throw new Error('Failed to submit the form');
        }

        const result = await response.json();
        console.log('Form submitted successfully:', result);
            
            

        }catch(error){
            console.error(error.message);
        }
        isDisable(false);
        

    }
    
return(
    <div>
         <form onSubmit = {handleSubmit(onSubmit)}>
            <div>
                <label>Product Name: </label>
                <input {...register('name',{
                    required:true,
                })}/>
                {errors.name && <p>{errors.name.message}</p>}
            </div>
            <br/>
            <div>
                <label>Price: </label>
                <input {...register('price',{
                    required:true,
                })}/>
                {errors.price && <p>{errors.price.message}</p>}
            </div>
            <br/>
            <div>
                <label>Description: </label>
                <input {...register('description',{
                    required:true,
                })}/>
                {errors.description && <p>{errors.description.message}</p>}
            </div>
            <br/>
            <button type='submit' disabled = {disable}>{disable?'Creating':'Create Listing'}</button>
        </form>
        <br/>
    </div>
)
}

export default CreateListing;