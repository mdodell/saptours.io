import {phoneRegExp} from "../../../common/constants";
import * as yup from "yup";

export const userValidationSchema = yup.object().shape({
    firstName: yup.string().required('Required!'),
    lastName: yup.string().required('Required!'),
    birthday: yup.string().required('Required').nullable(),
    roles: yup.array().min(1, 'You must have at least one role!').required('Required!'),
    phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid!').required('Required!'),
    minTours: yup.number().typeError('Minimum tours must be a number!').min(0, 'You cannot have a negative number of tours!').required('Required!'),
    maxTours: yup.number().typeError('Maximum tours must be a number!').min(0, 'You cannot have a negative number of tours!').required('Required!').test('maxtours-greater-than-mintours', 'Maximum tours must be greater than minimum tours', function(value) {return this.parent.minTours < value }),
    activeStatus: yup.string().required('Required!'),
});

export const academicValidationSchema = yup.object().shape({
    majors: yup.array().max(3, 'You can only have a maximum of 3 majors!').required('Required!'),
    minors: yup.array().max(3, 'You can only have a maximum of 3 minors!'),
    graduationYear: yup.number().typeError('Required!').required('Required!'),
    decisionType: yup.array().required('Required'),
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