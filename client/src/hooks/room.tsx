import React, { createContext, useCallback, useContext, useState } from 'react'

interface Props {

}

interface RoomContextData {
    roomData: any;
    sendCreate(data: any): void;
}

const RoomContext = createContext<RoomContextData>({} as RoomContextData)

const RoomProvider: React.FC = ({ children }) => {
    const [formRoom, setFormRoom] = useState({});

    const sendCreate = useCallback(
        async data => {
            setFormRoom(data);
        },
        [],
    )
    return (
        <RoomContext.Provider value={{
            sendCreate,
            roomData: formRoom,
        }}>
            {children}
        </RoomContext.Provider>
    )
}

function useRoom() {
    const context = useContext(RoomContext);

    if (!context) {
        throw new Error('useRoom must be used within an AuthProvider');
    }

    return context;
}

export { RoomProvider, useRoom }