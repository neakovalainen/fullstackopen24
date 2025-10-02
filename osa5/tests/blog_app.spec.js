// @ts-check
// @ts-ignore-next-line
import { test, expect, beforeEach, describe } from '@playwright/test'
const { loginWith, createBlog } = require('./helper')

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
      await loginWith(page, 'mluukkai', 'salainen')

      await expect(page.getByText('Matti Luukkainen has logged in')).toBeVisible()
    })

    test('user cannot log in with wrong username', async ({ page }) => {
      await loginWith(page, 'mluuuukkai', 'salainen')

      await expect(page.getByText('wrong credentials oh noh')).toBeVisible()
    })
  })
  describe('when user logged in can', () => {
    // @ts-ignore
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('user can create a blog', async ({ page })=> {
      await createBlog(page, 'how to eep?', 'salainen kirjailija', 'www.funtime.g')

      await expect(page.getByText('how to eep?')).toBeVisible()
    })


    test('user can like a blog', async ({ page }) => {
      await createBlog(page, 'how to eep?', 'salainen kirjailija', 'www.funtime.g')

      await page.getByRole('button', { name: 'view'}).click()
      await page.getByRole('button', { name: 'like'}).click()
      await expect(page.getByText('likes: 1')).toBeVisible()
    })

    test('user can delete their own blog', async ({ page }) => {
      await createBlog(page, 'how to eep?', 'salainen kirjailija', 'www.funtime.g')

      await page.getByRole('button', { name: 'view'}).click()

      await page.on('dialog', async (dialog) => {
        await dialog.accept()
      })
      await page.getByRole('button', { name: 'delete blog'}).click()
      await expect(page.getByText('how to eep?')).not.toBeVisible()
    })

    test('user cannot delete other users blogs', async ({ page, request }) => {
      await createBlog(page, 'how to eep?', 'salainen kirjailija', 'www.funtime.g')

      await page.getByRole('button', { name: 'log out' }).click()
      await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'miumiu',
        username: 'mau',
        password: 'maumau'
      }
      })
      await page.goto('http://localhost:5173')
      await loginWith(page, 'mau', 'maumau')
      await page.getByRole('button', { name: 'view'}).click()
      await expect(page.getByText('delete blog')).not.toBeVisible()
    })

    test('blogs are sorted correctly (most liked on top)', async ({ page }) => {
      await createBlog(page, 'how to eep?', 'salainen kirjailija', 'www.funtime.g')
      await expect(page.getByText('how to eep?')).toBeVisible()
      await page.getByRole('button', { name: 'cancel'}).click()
      await createBlog(page, 'secrets of eeping', 'nobody knows?', 'www.notgoodtime.eehheeh')

      await page.getByText('how to eep?').getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes: 1')).toBeVisible()
      await page.getByRole('button', { name: 'like' }).click()
      await page.getByRole('button', { name: 'hide' }).click()

      await page.getByText('secrets of eeping').getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes: 1')).toBeVisible()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes: 2')).toBeVisible()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes: 3')).toBeVisible()
      await page.getByRole('button', { name: 'hide' }).click()

      const viewButtons = await page.getByRole('button', { name: 'view' }).all()
      await viewButtons[0].click()
      await expect(page.getByText('likes: 3')).toBeVisible()

    })
  })
})