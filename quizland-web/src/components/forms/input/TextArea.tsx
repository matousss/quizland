import {ComponentProps, FC, useEffect, useState} from "react";

const TextArea: FC<ComponentProps<'textarea'> & { value?: string }> = ({
                                                                           className,
                                                                           value = '',
                                                                           maxLength,
                                                                           onChange,
                                                                           ...props
                                                                       }) => {
    const [length, setLength] = useState<number>(value.length);
    const [content, setContent] = useState<string>(value);

    useEffect(() => {
        setLength(content.length)
    }, [content])

    return (<>
        <textarea
            className={'bg-middle_dark border-2 rounded-md focus:ring-0 focus:border-contrast transition duration-250 ' +
                'scrollbar-primary scrollbar-rounded '
                + className}
            onChange={(e) => {
                if (maxLength && e.target.value.length > maxLength)
                    e.target.classList.add('border-red-800', 'focus:border-red-600')
                else e.target.classList.remove('border-red-800', 'focus:border-red-600')
                console.log(e.target.value.length)
                setContent(e.target.value);
                onChange && onChange(e);
            }
            }
            {...props}
        />
        <span className={'ml-auto bg-middle_dark relative bottom-11 right-4 opacity-75 rounded-md px-2'}>
            {length}{maxLength && `/${maxLength}`}
        </span>
    </>)
}

export default TextArea;