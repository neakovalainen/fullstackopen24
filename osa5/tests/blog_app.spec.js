// @ts-check
// @ts-ignore-next-line
import { test, expect, beforeEach, describe } from '@playwright/test'


describe('Blog app', () => {
  // @ts-ignore
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click()

    await expect(page.getByText('log in from here')).toBeVisible()
  })
})