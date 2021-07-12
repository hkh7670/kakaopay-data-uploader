import React from "react";
import { act, fireEvent, render, waitFor } from '@testing-library/react'
import App from './App';
import { shallow } from 'enzyme';
import Dropzone from "react-dropzone";

describe('<App />', () => {
    it('컴포넌트가 렌더링 되어야 합니다.', () => {
        const wrapper = shallow(<App/>);
        expect(wrapper.length).toBe(1);
    });

    it('타이틀이 렌더링되어야 합니다.', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find('#title').length).toEqual(1);
    });

    it('Dropzone 컴포넌트에 파일 업로드가 되어야 합니다.', () => {
        const wrapper = shallow(<App />);
        //Create a non-null file
        const fileContents = "file contents";
        const file = new File([fileContents], { type: "csv" });
        const fileList = [];
        fileList.push(file)

        expect(wrapper.find(Dropzone).simulate('drop', fileList)).toEqual({});
    })
});

test('invoke onDragEnter when dragenter event occurs', async () => {
    const file = new File([
        JSON.stringify({ping: true})
    ], 'ping.json', {type: 'application/json'})
    const data = mockData([file])
    const onDragEnter = jest.fn()

    const ui = (
        <Dropzone onDragEnter={onDragEnter}>
            {({getRootProps, getInputProps}) => (
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                </div>
            )}
        </Dropzone>
    )
    const {container, rerender} = render(ui)
    const dropzone = container.querySelector('div')

    dispatchEvt(dropzone, 'dragenter', data)
    await flushPromises(rerender, ui)

    expect(onDragEnter).toHaveBeenCalled()
})

async function flushPromises(rerender, ui) {
    await act(() => waitFor(() => rerender(ui)))
}

function dispatchEvt(node, type, data) {
    const event = new Event(type, {bubbles: true})
    Object.assign(event, data)
    fireEvent(node, event)
}

function mockData(files) {
    return {
        dataTransfer: {
            files,
            items: files.map(file => ({
                kind: 'file',
                type: file.type,
                getAsFile: () => file
            })),
            types: ['Files']
        }
    }
}