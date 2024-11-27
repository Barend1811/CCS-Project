import { shallowMount } from "@vue/test-utils";
import { describe, it, expect, test, vi } from "vitest";
import SetupView from "../src/views/SetupView.vue";
import { http } from 'msw'
import { server } from '../src/mocks/server';

describe('Testing the SetupView components, functions and http requests', () => {
    it('Should render correctly', () => {
        let wrapper = shallowMount(SetupView);
        expect(wrapper.html()).toMatchSnapshot()
    })
    test('Button calls setupDb() when clicked', async () => {
        const wrapper = shallowMount(SetupView)
        const setupBtn = wrapper.find('#setupBtn')
        const spy = vi.spyOn(wrapper.vm, 'setupDb')
        setupBtn.trigger('click')
        await wrapper.vm.$nextTick()
        expect(spy).toHaveBeenCalled()
        vi.restoreAllMocks()
    })
    test('Setup Database by sending request to API and return message', async () => {
        server.use(
            http.get('/api/setup', (req, res, ctx) => {
                return res(ctx.status(200), ctx.json([
                    { message: "Database is working" }
                ]))
            }),
        );
    })
})



