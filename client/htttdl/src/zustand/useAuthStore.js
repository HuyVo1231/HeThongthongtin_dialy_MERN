import create from 'zustand'

const useAuthStore = create((set) => ({
  authUser: JSON.parse(localStorage.getItem('token')) || null,
  setAuthUser: (user) => {
    localStorage.setItem('token', JSON.stringify(user))
    set({ authUser: user })
  },
  logout: () => {
    localStorage.removeItem('token')
    set({ authUser: null })
  }
}))

export default useAuthStore
