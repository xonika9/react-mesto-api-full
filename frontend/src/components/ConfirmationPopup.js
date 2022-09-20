import PopupWithForm from './PopupWithForm';
function ConfirmationPopup({
  card,
  onClose,
  onOverlay,
  onConfirmDeletion,
  isLoading,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onConfirmDeletion(card);
  }
  return (
    <PopupWithForm
      name='confirm'
      title='Вы уверены?'
      buttonContent={!isLoading ? 'Да' : 'Удаление...'}
      onClose={onClose}
      isOpened={card}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isValid={true}
      onOverlay={onOverlay}
    />
  );
}
export default ConfirmationPopup;
