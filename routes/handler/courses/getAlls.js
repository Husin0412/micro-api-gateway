const apiAdatapter = require('../../apiAdapter');
const {
    URL_SERVICE_COURSE,
    HOSTNAME
} = process.env;

const api = apiAdatapter(URL_SERVICE_COURSE);

module.exports = async (req, res) => {
    try {
        const courses = await api.get('/api/courses/all');
        return res.json(courses.data)
    } catch (error) {

        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({
                status: 'error',
                message: 'service course unavailable'
            });
        }

        const {
            status,
            data
        } = error.response;
        return res.status(status).json(data)
    }
}