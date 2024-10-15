import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextEditor = ({ content, setContent, placeholder }: any) => {
  const handleChange = (newContent: any) => {
    setContent(newContent);
  };

  return (
    <div>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextEditor;

