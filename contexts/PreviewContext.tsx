import { createContext, useState } from "react";

interface IPreviewContext {
    title: string;
    setTitle(title: string): any;
    value: string;
    setValue(value: string): any;
    tags: string[];
    setTags(tags: string[]): any;
    startDate: string;
    setStartDate(startDate: string): any;
    endDate: string;
    setEndDate(endDate: string): any;
    toll: number;
    setToll(toll: number): any;
    approvalThreshold: number;
    setApprovalThreshold(approvalThreshold: number): any;
}

export const PreviewContext = createContext<IPreviewContext>({} as IPreviewContext);

const PreviewProvider = ({ children }) => {
    const [title, setTitle] = useState<string>("");
    const [value, setValue] = useState<string>("# XDC Proposal Editor");
    const [tags, setTags] = useState<string[]>([]);
    const [startDate, setStartDate] = useState<string>("dd/mm/yyyy");
    const [endDate, setEndDate] = useState<string>("dd/mm/yyyy");
    const [toll, setToll] = useState<number>(0);
    const [approvalThreshold, setApprovalThreshold] = useState<number>(10);

    return (
        <PreviewContext.Provider value={{
            title,
            setTitle,
            value,
            setValue,
            tags,
            setTags,
            startDate,
            setStartDate,
            endDate,
            setEndDate,
            toll,
            setToll,
            approvalThreshold,
            setApprovalThreshold
        }}>
            {children}
        </PreviewContext.Provider>
    );
}

export default PreviewProvider;
