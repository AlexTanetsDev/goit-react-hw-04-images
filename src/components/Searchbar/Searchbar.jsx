import { Formik, ErrorMessage} from "formik"
import * as yup from 'yup';
import { Header, SearchBtn, SearchBtnLabel, SearchForm, SearchFormInput } from "./Searchbar.styled";
import { BiSearchAlt2 } from "react-icons/bi";
import PropTypes from "prop-types"

const schema = yup.object().shape({
    searchQuery: yup.string().required(),
})

const initialValues = {
searchQuery: ""
}


export const Searchbar = ({onFormSubmit}) => {
    const hendleSubmit = (values, { resetForm }) => {
        onFormSubmit(values);
        resetForm();
        }

    return (
        <Header >
            <Formik initialValues={initialValues } validationSchema={schema} onSubmit={hendleSubmit}>
               <SearchForm >
                    <SearchBtn type="submit">
                        <BiSearchAlt2 size="30px" />
                  <SearchBtnLabel >Search</SearchBtnLabel>
                  </SearchBtn>
                    <SearchFormInput
                        name="searchQuery"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                   <ErrorMessage name="searchQuery" component="div"/> 
                </SearchForm>
            </Formik>
</Header>
    )
}

Searchbar.propTypes = {
    onFormSubmit: PropTypes.func.isRequired
}