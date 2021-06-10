import React from 'react';

import { RoomProvider } from './room';

export const AppProvider: React.FC = ({ children }) => (
    <RoomProvider>
        {children}
    </RoomProvider>
);