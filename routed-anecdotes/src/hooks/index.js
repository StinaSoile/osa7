import { useState } from "react"
export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        if (event)
            setValue(event.target.value)
        else setValue('')
    }

    return {
        type,
        value,
        onChange
    }
}


// Sovellus pelkistyy muotoon:
// const App = () => {
//     const name = useField('text')
//     const born = useField('date')
//     const height = useField('number')

//     return (
//         <div>
//             <form>
//                 name:
//                 <input  {...name} />
//                 <br />
//                 birthdate:
//                 <input {...born} />
//                 <br />
//                 height:
//                 <input {...height} />
//             </form>
//             <div>
//                 {name.value} {born.value} {height.value}
//             </div>
//         </div>
//     )
// }