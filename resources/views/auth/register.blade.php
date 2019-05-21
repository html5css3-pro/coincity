@extends('layouts.single')

@section('single_page_content')
    <div class="popup active">
        <div class="popup-log-reg active">
            <div class="log-reg">
                <a href="{{ route('home') }}" class="close"></a>
                <h3>Create your account to save the progress</h3>
                <form class="form-horizontal" method="POST" action="{{ route('register') }}">
                    {{ csrf_field() }}

                    <input class="js-sh" type="hidden" name="sh" value="{{ old('sh') }}">
                    <section>
                        <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                            <label for="email">E-Mail</label>
                            <input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}" required>
                            @if ($errors->has('email'))
                                <span class="help-block">{{ $errors->first('email') }}</span>
                            @endif
                        </div>
                        <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                            <label for="password">Password</label>
                            <input id="password" type="text" class="form-control" name="password" required>
                            @if ($errors->has('password'))
                                <span class="help-block">{{ $errors->first('password') }}</span>
                            @endif
                        </div>
                    </section>
                    <footer>
                        <button type="submit" class="btn purple">
                            Register
                        </button>
                    </footer>
                </form>
            </div>
        </div>
    </div>
@endsection
