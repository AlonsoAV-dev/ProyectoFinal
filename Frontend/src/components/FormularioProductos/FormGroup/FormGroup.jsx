import './FormGroup.scss';

const FormGroup = ({ label, htmlFor, children, style }) => (
  <div className="form-group" style={style}>
    <label htmlFor={htmlFor}>{label}</label>
    {children}
  </div>
);

export default FormGroup;
