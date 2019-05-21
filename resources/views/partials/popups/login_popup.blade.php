<div class="js-log popup-log-reg{{ $errors->any() ? ' active' : '' }}">
    <a href="#" class="close js-closePopup"></a>
    <div class="log-reg">
        <h3>Log in to your account</h3>
        <form class="form-horizontal" method="POST" action="{{ route('login') }}">
            {{ csrf_field() }}

            <section>
                <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                    <label for="email" class="col-md-4 control-label">E-Mail</label>
                    <input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}" autofocus required>

                    @if ($errors->has('email'))
                        <span class="help-block">{{ $errors->first('email') }}</span>
                    @endif

                    @if ( session('not_confirmed')  )
                        <a class="btn btn-link" href="{{ '/register/resend-verification?email=' . old('email') }}">Resend verification code!</a>
                    @endif
                </div>

                <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                    <label for="password" class="col-md-4 control-label">Password</label>
                    <input id="password" type="password" class="form-control" name="password" required>

                    @if ($errors->has('password'))
                        <span class="help-block">{{ $errors->first('password') }}</span>
                    @endif
                </div>

                <div class="form-group">
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }}> Remember Me
                        </label>
                    </div>
                </div>
            </section>

            <footer>
                <button type="submit" class="btn green">
                    Login
                </button>

                <a class="#" href="{{ route('password.request') }}">
                    Forgot Your Password?
                </a>
            </footer>

            <hr>
            <a class="btn social-box social-box-google"
               href="{!! route('socialite.auth', 'google') !!}">
                <img class="ico-google" src="{{ asset('img/social/icon_google.svg') }}"
                     alt="">
                Google
            </a>
            <a class="btn social-box social-box-facebook"
               href="{!! route('socialite.auth', 'facebook') !!}">
                <img class="ico-facebook" src="{{ asset('img/social/icon_facebook.svg') }}"
                     alt="">
                Facebook
            </a>
        </form>
    </div>
</div>