function AuthForm({ name, title, submitText, children, onSubmit, isValid }) {
  return (
    <>
      <h2 className='authorization__title'>{title}</h2>
      <form
        className='authorization__form'
        name={`${name}-form`}
        onSubmit={onSubmit}
        noValidate
      >
        {children}
        <button
          className={`authorization__submit-button ${
            !isValid && 'authorization__submit-button_disabled'
          }`}
          type='submit'
          disabled={!isValid}
          aria-label={submitText}
        >
          {submitText}
        </button>
      </form>
    </>
  );
}
export default AuthForm;
