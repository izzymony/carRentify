'use client'
import { useState, useEffect } from 'react'
import { updateProfile, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {useAuth}  from '@/app/context/AuthContext'

const page =() => {
  const { user, logOut } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  useEffect(() => {
    if (!user) {
      router.push('/Login')
      return
    }

    setFormData({
      displayName: user.displayName || '',
      email: user.email || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
    setLoading(false)
  }, [user, router])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      // Update display name if changed
      if (formData.displayName !== user.displayName) {
        await updateProfile(user, {
          displayName: formData.displayName
        })
      }

      // Update email if changed
      if (formData.email !== user.email) {
        await updateEmail(user, formData.email)
      }

      // Update password if provided
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error("Passwords don't match")
        }

        // Reauthenticate user before password change
        const credential = EmailAuthProvider.credential(
          user.email,
          formData.currentPassword
        )
        await reauthenticateWithCredential(user, credential)
        
        await updatePassword(user, formData.newPassword)
      }

      setSuccess('Profile updated successfully!')
      setEditMode(false)
      // Refresh to get updated user data
      window.location.reload()
    } catch (error) {
      console.error('Update error:', error)
      let errorMessage = 'Failed to update profile'
      
      switch (error.code) {
        case 'auth/requires-recent-login':
          errorMessage = 'Please reauthenticate to update your email or password'
          break
        case 'auth/wrong-password':
          errorMessage = 'Current password is incorrect'
          break
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters'
          break
        case 'auth/email-already-in-use':
          errorMessage = 'Email is already in use'
          break
        default:
          errorMessage = error.message || 'Failed to update profile'
      }
      
      setError(errorMessage)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#646ae8]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Profile Header */}
          <div className="bg-[#646ae8] p-6 text-white">
            <div className="flex items-center space-x-4">
              <div className="relative h-20 w-20 rounded-full bg-white flex items-center justify-center overflow-hidden">
                {user.photoURL ? (
                  <Image 
                    src={user.photoURL} 
                    alt="Profile" 
                    width={80} 
                    height={80}
                    className="object-cover"
                  />
                ) : (
                  <span className="text-3xl text-[#646ae8] font-bold">
                    {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  {user.displayName || 'User'}
                </h1>
                <p className="text-[#d8d9fd]">{user.email}</p>
                <p className="text-sm mt-1">
                  Member since: {new Date(user.metadata.creationTime).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-lg">
                {success}
              </div>
            )}

            {editMode ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#646ae8] focus:border-[#646ae8]"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#646ae8] focus:border-[#646ae8]"
                  />
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-lg font-semibold mb-3">Change Password</h3>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Current Password</label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      placeholder="Enter current password"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#646ae8] focus:border-[#646ae8]"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      placeholder="Enter new password"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#646ae8] focus:border-[#646ae8]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm new password"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#646ae8] focus:border-[#646ae8]"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#646ae8] text-white rounded-lg hover:bg-[#4a50c5]"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
                    <p><span className="text-gray-600">Name:</span> {user.displayName || 'Not set'}</p>
                    <p><span className="text-gray-600">Email:</span> {user.email}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Account Information</h3>
                    <p><span className="text-gray-600">Account Created:</span> {new Date(user.metadata.creationTime).toLocaleDateString()}</p>
                    <p><span className="text-gray-600">Last Login:</span> {new Date(user.metadata.lastSignInTime).toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex space-x-3 pt-6">
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-4 py-2 bg-[#646ae8] text-white rounded-lg hover:bg-[#4a50c5]"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={logOut}
                    className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default page;