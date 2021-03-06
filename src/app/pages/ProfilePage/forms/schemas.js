import {phoneRegExp, REGULAR_DECISION, ED1, ED2} from "../../../common/constants";
import * as yup from "yup";

export const userValidationSchema = yup.object().shape({
    fullName: yup.string().required('Required!'),
    highSchool: yup.string().required('Required!'),
    birthday: yup.string().required('Required').nullable(),
    dietaryRestrictions: yup.array(),
    city: yup.string().required('Required!'),
    state: yup.string().required('Required!'),
    roles: yup.array(),
    phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid! Please enter your phone number with 10 digits only.').required('Required!'),
    minTours: yup.number().typeError('Minimum tours must be a number!').min(0, 'You cannot have a negative number of tours!').required('Required!'),
    maxTours: yup.number().typeError('Maximum tours must be a number!').min(0, 'You cannot have a negative number of tours!').required('Required!').test('maxtours-greater-than-mintours', 'Maximum tours must be greater than or equal to minimum tours', function(value) {return this.parent.minTours <= value }),
    activeStatus: yup.string().required('Required!'),
    flexibility: yup.string().required('Required!')
});

export const academicValidationSchema = yup.object().shape({
    majors: yup.array().max(3, 'You can only have a maximum of 3 majors!').required('Required!'),
    minors: yup.array().max(3, 'You can only have a maximum of 3 minors!'),
    fellowships_scholarships: yup.array(),
    graduationYear: yup.number().typeError('Required!').required('Required!'),
    decisionType: yup.array().required('Required').test('must-contain-admission-time-type', 'You must put in if you were only either ED1, ED2, or Regular Decision!', function(value){
        return (value.includes(ED1) || value.includes(ED2) || value.includes(REGULAR_DECISION)) &&
            (
                (value.includes(ED1) && !value.includes(ED2) && !value.includes(REGULAR_DECISION)) ||
                (value.includes(ED2) && !value.includes(ED1) && !value.includes(REGULAR_DECISION)) ||
                (value.includes(REGULAR_DECISION) && !value.includes(ED1) && !value.includes(ED2))
            )
    }),
    postGraduationPlans: yup.string()
});

export const extracurricularValidationSchema = yup.object().shape({
    clubs: yup.array(),
    jobs: yup.string(),
    internships: yup.string(),
    research: yup.string()
});

export const availabilityValidationSchema = yup.object().shape({
    monday: yup.array(),
    tuesday: yup.array(),
    wednesday: yup.array(),
    thursday: yup.array(),
    friday: yup.array()
});