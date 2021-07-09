import React,{useState} from 'react'
import styled from "styled-components"

const Container = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const TitleNewsletter = styled.h1 `
  color: white;
  font-size: 22px;
  text-shadow: 0 0 5px #000;
  margin: 3px 0;
`
const Paragraph = styled.p `
  color: white;
  font-size: 14px;
  text-shadow: 0 0 5px #000;
  text-align: center;
  margin: 3px 0 6px 0;
`
const FormCustomNewsletter = styled.form `
  width: 100%;
`
const LabelCustom = styled.label`
  font-size: 14px;
  color: white;
  text-shadow: 0 0 5px #000;

`
const InputCustom = styled.input `
  border: none;
  padding:8px 20px;
  width: 100%;
  border-radius: 5px;
  margin: 3px 0;
`
const InputCustomDate = styled(InputCustom)`
  width: 86%;
`
const ButtonSubmit = styled.button `
  width: 100%;
  background-color: #f7c1bb;
  font-weight: bold;
  color: #000;
  border: none;
  padding: 8px 20px;
  border-radius:5px;
  margin: 3px 0;
  cursor:pointer;
`
const TermsConditions = styled.p`
  color: white;
  text-shadow: 0 0 5px #000;
  font-size: 12px;
  text-align: center;
`
const TermsConditionsLink = styled.a`
  color: white;
`
const ParagraphError = styled.p`
  color: red;
  font-size: 12px;
  margin: 2px 0;
`
const ParagraphSuccessfully = styled.p`
  font-size: 22px;
  color: white;
  text-shadow: 0 0 5px #000;
  margin-top: 42%;
`
const Newsletter = () => {
  //useState
  const [userFirstName, setUserFirstName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userHomePhone, setUserHomePhone] = useState("");
  const [userBirthDay, setUserBirthDay] = useState("");
  const [errorUserFirstName, setErrorUserFirstName] = useState(false);
  const [errorUserEmail, setErrorUserEmail] = useState(false);
  const [errorUserHomePhone, setErrorUserHomePhone] = useState(false);
  const [errorUserBirthDay, setErrorUserBirthDay] = useState(false);
  const [sentSuccessfully, setSentSuccessfully] = useState(false);

  //function newsletter form
  const subtmitNewsletterForm = async (event) => {
    event.preventDefault();
    if(!userFirstName.trim()){
      setErrorUserFirstName(true);
    }if (!userEmail.trim()){
      setErrorUserEmail(true);
    }if (!userHomePhone.trim() || userHomePhone.length > 11){
      setErrorUserHomePhone(true);
    }
    if(!userBirthDay.trim()){
      setErrorUserBirthDay(true);
    }else {
      const subscribeClient = {
        isNewsletterOptIn: true,
        firstName: userFirstName,
        birthDate: userBirthDay,
        email: userEmail,
        homePhone: userHomePhone
      }
    const URL = "/api/dataentities/CL/documents";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/vnd.vtex.ds.v10+json",
        "x-vtex-api-appKey":"",
        "x-vtex-api-appToken":"",
      },
      body: JSON.stringify(subscribeClient),
    };
    try {
       await fetch(URL,options);
       //Reset form
       setUserFirstName("");
       setUserEmail("");
       setUserHomePhone("");
       setUserBirthDay("");
       //Subscription was sent successfully
       setSentSuccessfully(true);


    } catch (error) {
      console.log("Error en el envío del newsletter", error);
    }
   }
  }

  return (
    <>
      <Container>
        {sentSuccessfully
        ? <ParagraphSuccessfully>¡Gracias por suscribirte!</ParagraphSuccessfully>
        :
        <>
        <TitleNewsletter>¡Que no se te pase ni una!</TitleNewsletter>
        <Paragraph>Deja tus datos y enterate de todo lo que pasa en Miniso antes que nadie.</Paragraph>
          <FormCustomNewsletter onSubmit={subtmitNewsletterForm}>
            <LabelCustom>Ingresa tu nombre</LabelCustom>
            <InputCustom
              type="text"
              name="firstName"
              onChange={(event) => setUserFirstName(event.target.value)}
            />
            {errorUserFirstName && <ParagraphError>Debes de agregar un nombre</ParagraphError>}
            <LabelCustom>Ingresa tu correo</LabelCustom>
            <InputCustom
              type="email"
              name="email"
              onChange={(event) => setUserEmail(event.target.value)}
            />
            {errorUserEmail && <ParagraphError>Debes de agregar un email.</ParagraphError>}
            <LabelCustom>Ingresa tu número telefónico</LabelCustom>
            <InputCustom
              type="tel"
              name="homePhone"
              pattern="[0-9]+"
              onChange={(event) => setUserHomePhone(event.target.value)}
            />
            {errorUserHomePhone && <ParagraphError>Debes de agregar un número telefónico.</ParagraphError>}
            <LabelCustom>Ingresa tu cumpleaños</LabelCustom>
            <InputCustomDate
              type="date"
              name="birthDate"
              onChange={(event) => setUserBirthDay(event.target.value)}
            />
            {errorUserBirthDay && <ParagraphError>Debes de agregar una fecha.</ParagraphError>}
            <ButtonSubmit>ENVIAR</ButtonSubmit>
          </FormCustomNewsletter>
        <TermsConditions>Al momento de enviar mi correo acepto los <TermsConditionsLink href="https://www.miniso.cl/terminos-y-condiciones">Términos y condiciones</TermsConditionsLink> y el <TermsConditionsLink href="https://www.miniso.cl/aviso-de-privacidad"> Aviso de privacidad.</TermsConditionsLink> </TermsConditions>
        </>
        }
      </Container>
    </>
  )
}

export default Newsletter
