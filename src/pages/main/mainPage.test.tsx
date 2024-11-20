// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import MainPage from '@/pages/main';
import { BrowserRouter } from 'react-router-dom';

describe('MainPage', () => {
    test('отображает фильтр и таблицу сотрудников', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <MainPage />
                </BrowserRouter>
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByLabelText(/Role/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Archive Status/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Sort By/i)).toBeInTheDocument();


            expect(screen.getByRole('table')).toBeInTheDocument();
        });
    });
});