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
  describe('Log in', () => {
    test('user can log in with mluukkai', async ({ page }) => {
      await page.getByRole('button', { name: 'login' }).click()

      await page.getByLabel('username').fill('mluukkai')
      await page.getByLabel('password').fill('salainen')

      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Matti Luukkainen has logged in')).toBeVisible()
    })

    test('user cannot log in with wrong username', async ({ page }) => {
      await page.getByRole('button', { name: 'login' }).click()

      await page.getByLabel('username').fill('mlukkai')
      await page.getByLabel('password').fill('salainen')

      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('wrong credentials oh noh')).toBeVisible()
    })
  })
  describe('when user logged in can', () => {
    // @ts-ignore
    beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'login' }).click()

      await page.getByLabel('username').fill('mluukkai')
      await page.getByLabel('password').fill('salainen')

      await page.getByRole('button', { name: 'login' }).click()
    })

    test('user can create a blog', async ({ page })=> {
      await page.getByRole('button', { name: 'new blog'}).click()

      await page.getByLabel('title:').fill('how to eep?')
      await page.getByLabel('author:').fill('salainen kirjailija')
      await page.getByLabel('url:').fill('www.funtime.g')
      await page.getByRole('button', { name: 'create blog'}).click()
      await expect(page.getByText('how to eep?')).toBeVisible()
    })


    test('user can like a blog', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog'}).click()

      await page.getByLabel('title:').fill('how to eep?')
      await page.getByLabel('author:').fill('salainen kirjailija')
      await page.getByLabel('url:').fill('www.funtime.g')
      await page.getByRole('button', { name: 'create blog'}).click()

      await page.getByRole('button', { name: 'view'}).click()
      await page.getByRole('button', { name: 'like'}).click()
      await expect(page.getByText('likes: 1')).toBeVisible()
    })

    test('user can delete their own blog', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog'}).click()

      await page.getByLabel('title:').fill('how to eep?')
      await page.getByLabel('author:').fill('salainen kirjailija')
      await page.getByLabel('url:').fill('www.funtime.g')
      await page.getByRole('button', { name: 'create blog'}).click()

      await page.getByRole('button', { name: 'view'}).click()

      await page.on('dialog', async (dialog) => {
        await dialog.accept()
      })
      await page.getByRole('button', { name: 'delete blog'}).click()
      await expect(page.getByText('how to eep?')).not.toBeVisible()
    })

    test('user cannot delete other users blogs', async ({ page, request }) => {
      await page.getByRole('button', { name: 'new blog'}).click()

      await page.getByLabel('title:').fill('how to eep?')
      await page.getByLabel('author:').fill('salainen kirjailija')
      await page.getByLabel('url:').fill('www.funtime.g')
      await page.getByRole('button', { name: 'create blog'}).click()

      await page.getByRole('button', { name: 'log out' }).click()
      await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'miumiu',
        username: 'mau',
        password: 'maumau'
      }
      })
    await page.goto('http://localhost:5173')
    await page.getByRole('button', { name: 'login' }).click()

    await page.getByLabel('username').fill('mau')
    await page.getByLabel('password').fill('maumau')

    await page.getByRole('button', { name: 'login' }).click()
    await page.getByRole('button', { name: 'view'}).click()
    await expect(page.getByText('delete blog')).not.toBeVisible()
    })

    test('blogs are sorted correctly (most liked on top', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog'}).click()
      await page.getByLabel('title:').fill('how to eep?')
      await page.getByLabel('author:').fill('salainen kirjailija')
      await page.getByLabel('url:').fill('www.funtime.g')
      await page.getByRole('button', { name: 'create blog' }).click()
      await expect(page.getByText('how to eep?')).toBeVisible()
      await page.getByRole('button', { name: 'cancel'}).click()

      await page.getByRole('button', { name: 'new blog'}).click()
      await page.getByLabel('title:').fill('secrets of eeping')
      await page.getByLabel('author:').fill('nobody knows?')
      await page.getByLabel('url:').fill('www.notgoodtime.eehheeh')
      await page.getByRole('button', { name: 'create blog'}).click()

      await page.getByText('how to eep?').getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await page.getByRole('button', { name: 'hide' }).click()

      await page.getByText('secrets of eeping').getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await page.getByRole('button', { name: 'hide' }).click()

      const viewButtons = await page.getByRole('button', { name: 'view' }).all()
      await viewButtons[0].click()
      await expect(page.getByText('likes: 3')).toBeVisible()

    })
  })
})