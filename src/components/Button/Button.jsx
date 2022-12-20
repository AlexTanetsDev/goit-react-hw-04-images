import { LoadBtn } from "./Button.styled"
import PropTypes from "prop-types";

export const LoadMoreBtn = ({onBtnClick}) => {
    return (
        <LoadBtn type="button" onClick={onBtnClick}>Load more</LoadBtn>
    )
}

LoadMoreBtn.propTypes = {
    onBtnClick: PropTypes.func.isRequired
}