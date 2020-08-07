import React from 'react';
import axios from 'axios';
import './index.scss';

const LOGO = 'https://sigma-studios.s3-us-west-2.amazonaws.com/test/sigma-logo.png'
const IMAGEN = 'https://sigma-studios.s3-us-west-2.amazonaws.com/test/sigma-image.png'
const API = 'https://sigma-studios.s3-us-west-2.amazonaws.com/test/colombia.json'

const Landing = () => {

  const [departmentData, setDepartmentData] = React.useState({});
  const [departmentNames, setDepartmentNames] = React.useState([]);
  const [cities, setCities] = React.useState([]);
  const [form, setForm] = React.useState({ department: '', city: '', name: '', email: '' })

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await axios('http://localhost:3000/places');
      setDepartmentData(response.data)
    }
    fetchData();
  }, [])

  React.useEffect(() => {
    setDepartmentNames(Object.entries(departmentData))
  }, [departmentData])

  React.useEffect(() => {
    departmentNames.map((item) => {
      if (item[0] === form.department) {
        setCities(item[1])
      }
      console.log(item[0], form.department)

    })
    console.log(cities)
  }, [form])

  const onChangeForm = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })

  }
  const onSubmitForm = (event) => {
    event.preventDefault();
    console.log('enviar', form)
  }

  return (
    <main>
      <section className='landing'>

        <figure className='landing__logo'>
          <img src={LOGO} alt='Logo Sigma 3ds' />
        </figure>

        <div className='landing__text'>
          <h1 className='title'>Prueba de desarollo Sigma</h1>
          <p>Lorem ipsum is simply dummy text of printing and  typesetting industry. Lorem ipsum has been the industry's standard dummy terxt ever since the 1500s, when an unknown printer took a gallery of type and scrambled it to make a type specimen book.</p>
        </div>

        <article className='landing__wp'>
          <figure className='landing__wp__ilustration'>
            <img src={IMAGEN} alt='Ilustración del landing page' />
          </figure>

          <form className='landing__wp__form' onSubmit={onSubmitForm}>
            <label htmlFor='department_landing' className='require_input'>
              <p>Departamento</p>
              <select name='department' id='department_landing' required defaultValue='' onChange={onChangeForm}>
                <option selected disabled hidden value=''>Selecciona un departamento</option>
                {departmentNames.map((item) => {
                  return (
                    <option value={item[0]} key={item[0]}>{item[0]}</option>
                  )
                })}
              </select>
            </label>

            <label htmlFor='city_landing' className='require_input' onChange={onChangeForm}>
              <p>Ciudad</p>
              <select name='city' id='city_landing' required defaultValue=''>
                <option selected disabled hidden value=''>Selecciona una ciudad</option>
                {cities.map((item, i) => {
                  return (
                    <option value={item} key={item}>{item}</option>
                  )
                })}
              </select>
            </label>

            <label htmlFor='name_landing' className='require_input'>
              <p>Nombre</p>
              <input type='text' name='name' required placeholder='Pepito de Jesús' id='name_landing' onChange={onChangeForm} />
            </label>

            <label htmlFor='email_landing' className='require_input'>
              <p>Correo</p>
              <input type='email' name='email' required placeholder='Pepitodesjesus@gmail.com' id='email_landing' onChange={onChangeForm} />
            </label>

            <button type='submit'>Enviar</button>
          </form>
        </article>
      </section>
    </main>
  )
};

export default Landing;
