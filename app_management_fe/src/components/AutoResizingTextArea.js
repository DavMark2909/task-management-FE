import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import classes from './css/TextArea.module.css'; 

const AutoResizingTextarea = forwardRef((props, ref) => {
    const [value, setValue] = useState('');
    const textareaRef = useRef(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    }, [value]);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const getValue = () => {
        return textareaRef.current.value;
    }

    const reset = () => {
        textareaRef.current.value = value;
        setValue("");

    }

    useImperativeHandle(ref, () => ({
        getValue,
        reset
    }));

    return (
        <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            className={classes.textarea}
            rows="1"
        />
    );
});

export default AutoResizingTextarea;
