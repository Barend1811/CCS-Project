import { shallowMount } from "@vue/test-utils";
import { describe, it, expect, test, vi } from "vitest";
import EditView from "../src/views/EditView.vue";
import { http } from 'msw'
import { server } from '../src/mocks/server';

describe('Testing the EditView components, functions and http requests', () => {
    it('Should render correctly', () => {
        let wrapper = shallowMount(EditView);
        expect(wrapper.html()).toMatchSnapshot()
    })
    test('Calls edit() when form submitted', async () => {
        const wrapper = shallowMount(EditView)
        const editForm = wrapper.find('#editForm')
        const spy = vi.spyOn(wrapper.vm, 'edit')
        editForm.trigger('submit')
        await wrapper.vm.$nextTick()
        expect(spy).toHaveBeenCalled()
        vi.restoreAllMocks()
    })
    test('Update account data and return message', async () => {
        server.use(
            http.post('/api/user/edit', (req, res, ctx) => {
                return res(ctx.status(200), ctx.json([
                    { message: "Account succesfully updated" }
                ]))
            }),
        );
    })
})
