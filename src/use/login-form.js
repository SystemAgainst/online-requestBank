import {useField, useForm} from "vee-validate";
import * as yup from "yup";
import {computed, watch} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

export function useLoginForm() {
    const store = useStore();
    const router = useRouter();
    const {handleSubmit, isSubmitting, submitCount} = useForm();

    const {value: email, errorMessage: eError, handleBlur: eBlur} = useField(
        'email',
        yup
            .string()
            .trim()
            .required()
            .email()
    );
    const {value: password, errorMessage: pError, handleBlur: pBlur} = useField(
        'password',
        yup
            .string()
            .trim()
            .required()
            .min(6)
    );

    const onSubmit = handleSubmit(async values => {
        try {
            console.log('Form: ', values);
            await store.dispatch('auth/login', values);
            await router.push('/');
        } catch (e) {
            console.log(e.message);
        }
    })

    const isTooManyAttempts = computed(() => submitCount.value >= 3);

    watch(isTooManyAttempts, val => {
        if (val) {
            setTimeout(() => submitCount.value = 0, 1500);
        }
    });

    return {
        email,
        eError,
        eBlur,
        password,
        pError,
        pBlur,
        onSubmit,
        isSubmitting,
        isTooManyAttempts,
    };
}
