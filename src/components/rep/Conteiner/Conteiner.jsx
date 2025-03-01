import styled,{css} from 'styled-components'
import React from 'react'
import ContainerStyled from './Conteiner.styled'
function Conteiner ({children}){
    return(
        <ContainerStyled>
            {children}
        </ContainerStyled>
    )
}
export default Conteiner