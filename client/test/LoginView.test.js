import { shallowMount } from "@vue/test-utils";
import { describe, it, expect, test, vi } from "vitest";
import LoginView from "../src/views/LoginView.vue";
import { http } from 'msw'
import { server } from '../src/mocks/server';

describe('Testing the LoginView components, functions and http requests', () => {
    it('Should render correctly', () => {
        let wrapper = shallowMount(LoginView);
        expect(wrapper.html()).toMatchSnapshot()
    })
    test('Calls login() when form submitted', async () => {
        const wrapper = shallowMount(LoginView)
        const loginForm = wrapper.find('#loginForm')
        const spy = vi.spyOn(wrapper.vm, 'login')
        loginForm.trigger('submit')
        await wrapper.vm.$nextTick()
        expect(spy).toHaveBeenCalled()
        vi.restoreAllMocks()
    })
    test('Login and return email and token', async () => {
        server.use(
            http.post('/api/login', (req, res, ctx) => {
                return res(ctx.status(200), ctx.json([
                    { email, token }
                ]))
            }),
        );
    })
})
