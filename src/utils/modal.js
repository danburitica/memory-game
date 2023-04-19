import Swal from "sweetalert2";
import { setName } from "../containers/App/slices/userSlice";
import { resetGame } from "../containers/App/slices/gameSlice";

const createNewGame = ({
  dispatch,
  createGameBoard,
  setFlippedCards,
  setIsDisabled,
}) => {
  setFlippedCards([]);
  setIsDisabled(false);
  dispatch(resetGame());
  createGameBoard();
};

const gameOverModal = async ({
  user,
  hits,
  misses,
  createGameBoard,
  setFlippedCards,
  setIsDisabled,
  dispatch,
}) => {
  const modalConfig = {
    title: `Hey, ${user}!`,
    text: `You finished the game with ${hits+1} hits and ${misses} misses 🥳`,
    width: "auto",
    padding: "1em",
    color: "#211A1D",
    background: "#F8F0FB",
    backdrop: `rgba(33, 26, 29, 0.8)`,
    allowOutsideClick: false,
    allowEscapeKey: false,
    showDenyButton: true,
    confirmButtonText: "Play again",
    denyButtonText: "New player",
    confirmButtonColor: "#8075FF",
    denyButtonColor: "#6C757D",
    confirmButtonAriaLabel: "Play again button",
    denyButtonAriaLabel: "New player button",
  };

  if (window.innerWidth < 768) {
    modalConfig.width = "80%";
  }

  const { isConfirmed, isDenied } = await Swal.fire(modalConfig);

  if (isConfirmed) {
    createNewGame({
      dispatch,
      createGameBoard,
      setFlippedCards,
      setIsDisabled,
    });
  } else if (isDenied) {
    await usernameRequestModal({ dispatch });
    createNewGame({
      dispatch,
      createGameBoard,
      setFlippedCards,
      setIsDisabled,
    });
  }
};

const usernameRequestModal = async ({ dispatch }) => {
  const modalConfig = {
    title: "👋🏽 Hey! What's your name?",
    input: "text",
    inputPlaceholder: "Enter your name...",
    allowOutsideClick: false,
    allowEscapeKey: false,
    inputAttributes: {
      maxlength: 20,
      "aria-label": "Player's name input",
      title: "Please enter your name",
    },
    inputValidator: (value) => {
      if (!value) {
        return "😓 You need to write something!";
      }
    },
    confirmButtonText: "Save",
    confirmButtonColor: "#8075FF",
    confirmButtonAriaLabel: "Save button",
  };

  const { value } = await Swal.fire(modalConfig);

  if (value) {
    dispatch(setName(value));
  }
};

const Modal = {
  gameOverModal,
  usernameRequestModal,
};

export default Modal;
