// import { Link } from '@tanstack/react-router'
import { Logo } from '@/assets/logo'
import { cn, sleep } from '@/lib/utils'
import dashboardDark from '../assets/dashboard-dark.png'
import dashboardLight from '../assets/dashboard-light.png'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Loader2, LogIn } from 'lucide-react'


export function SignIn2() {
    return (
        <div className='relative container grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
            <div className='lg:p-8'>
                <div className='mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:w-120 sm:p-8'>
                    <div className='mb-4 flex items-center justify-center'>
                        <Logo className='me-2' />
                        <h1 className='text-xl font-medium'>Nkonta Admin</h1>
                    </div>
                </div>
                <div className='mx-auto flex w-full max-w-sm flex-col justify-center space-y-2'>
                    <div className='flex flex-col space-y-2 text-start'>
                        <h2 className='text-lg font-semibold tracking-tight'>Sign in</h2>
                        <p className='text-sm text-muted-foreground'>
                            Enter your email and password below to log into{' '}
                            <br className='max-sm:hidden' /> your account.
                        </p>
                    </div>
                    <UserAuthForm />
                    <p className='px-8 text-center text-sm text-muted-foreground'>
                        By clicking sign in, you agree to our{' '}
                        <a
                            href='/terms'
                            className='underline underline-offset-4 hover:text-primary'
                        >
                            Terms of Service
                        </a>{' '}
                        and{' '}
                        <a
                            href='/privacy'
                            className='underline underline-offset-4 hover:text-primary'
                        >
                            Privacy Policy
                        </a>
                        .
                    </p>
                </div>
            </div>

            <div
                className={cn(
                    'relative h-full overflow-hidden bg-muted max-lg:hidden',
                    '[&>img]:absolute [&>img]:top-[15%] [&>img]:left-20 [&>img]:h-full [&>img]:w-full [&>img]:object-cover [&>img]:object-top-left [&>img]:select-none'
                )}
            >
                <img
                    src={dashboardLight}
                    className='dark:hidden'
                    width={1024}
                    height={1151}
                    alt='Shadcn-Admin'
                />
                <img
                    src={dashboardDark}
                    className='hidden dark:block'
                    width={1024}
                    height={1138}
                    alt='Shadcn-Admin'
                />
            </div>
        </div>
    )
}

const formSchema = z.object({
    email: z.email({
        error: (iss) => (iss.input === '' ? 'Please enter your email.' : undefined),
    }),
    password: z
        .string()
        .min(1, 'Please enter your password.')
        .min(7, 'Password must be at least 7 characters long.'),
})

interface UserAuthFormProps extends React.HTMLAttributes<HTMLFormElement> {
    redirectTo?: string
}

function UserAuthForm({
    className,
    // redirectTo,
    ...props
}: UserAuthFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    // const { auth } = useAuthStore()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        setIsLoading(true)

        toast.promise(sleep(2000), {
            loading: 'Signing in...',
            success: () => {
                setIsLoading(false)

                // Mock successful authentication with expiry computed at success time
                // const mockUser = {
                //     accountNo: 'ACC001',
                //     email: data.email,
                //     role: ['user'],
                //     exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
                // }

                // // Set user and access token
                // auth.setUser(mockUser)
                // auth.setAccessToken('mock-access-token')

                // Redirect to the stored location or default to dashboard
                // const targetPath = redirectTo || '/'
                // navigate({ to: targetPath, replace: true })
                navigate("/dashboard", {
                    replace: true,
                });

                return `Welcome back, ${data.email}!`
            },
            error: 'Error',
        })
    }

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn("grid gap-3", className)}
            {...props}
        >
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>

                    <Input
                        id="email"
                        placeholder="name@example.com"
                        {...form.register("email")}
                    />

                    <FieldError>
                        {form.formState.errors.email?.message}
                    </FieldError>
                </Field>

                <Field className="relative">
                    <FieldLabel htmlFor="password">Password</FieldLabel>

                    <Input
                        type='password'
                        id="password"
                        placeholder="Password"
                        {...form.register("password")}
                    />

                    <FieldError>
                        {form.formState.errors.password?.message}
                    </FieldError>

                </Field>

                <Link
                    to="/forgot-password"
                    className=" inset-e-0 -top-0.5 text-sm font-medium text-muted-foreground hover:opacity-75"
                >
                    Forgot password?
                </Link>
            </FieldGroup>

            <Button className="mt-2" disabled={isLoading}>
                {isLoading ? (
                    <Loader2 className="animate-spin" />
                ) : (
                    <LogIn />
                )}
                Sign in
            </Button>

            <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>

                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>
        </form>
    )
}
