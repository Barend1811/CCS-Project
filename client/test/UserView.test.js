import { shallowMount, mount } from "@vue/test-utils";
import { describe, it, expect, test, vi } from "vitest";
import UserView from "../src/views/UserView.vue";
import { http } from 'msw'
import { server } from '../src/mocks/server';

describe('Testing the UserView components, functions and http requests', () => {
    it('Should render correctly', () => {
        let wrapper = shallowMount(UserView);
        expect(wrapper.html()).toMatchSnapshot()
    })
    test('Get user data on page load', async () => {
        server.use(
            http.get('/api/user', (req, res, ctx) => {
                return res(ctx.status(200), ctx.send([
                    { name: userName, email: email, sortcode: sortcode, accountNumber: accountNumber }
                ]))
            }),
        );
    })
})