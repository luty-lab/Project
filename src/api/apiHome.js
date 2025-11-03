import axios from 'axios'

const url = 'https://633988fhat48.vicp.fun/index/hello2'
// 定义请求函数()
export const apiGetMessage = async () => {
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
