import styled from "styled-components"

const CategoryCardImage = styled.div`
  &:before {
    content: " ";
    width: 100%;
    padding-top: 90%;
    background-image: url(${(props) => props.img});
    background-size: cover;
    background-position: center center;
  }
`
export default CategoryCardImage
