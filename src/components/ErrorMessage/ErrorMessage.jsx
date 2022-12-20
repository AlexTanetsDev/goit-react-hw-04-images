import { ErMessage } from "./ErrorMessage.styled"
import PropTypes from 'prop-types'

export const Errormessage = ({text}) => {
    return (
        <ErMessage>
            Oooopsss!!!: {text}
        </ErMessage>
    )
}


Errormessage.propTypes = {
    text: PropTypes.string.isRequired
}