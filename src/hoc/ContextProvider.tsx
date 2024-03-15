import {createContext, FC, PropsWithChildren} from 'react';

interface IProps extends PropsWithChildren{
}

const FirstContext = createContext<number>(null);
const SecondContext = createContext<{name:string}>(null);

const ContextProvider: FC<IProps> = ({children}) => {
    return (
        <FirstContext.Provider value={555}>
            <SecondContext.Provider value={{name:'max'}}>
                {children}
            </SecondContext.Provider>
        </FirstContext.Provider>
    );
};

export {ContextProvider,FirstContext,SecondContext};