@extends('layouts.app')

@section('content')
    <div class="container">
        <form action="/posts" method="POST">
            @csrf
            <input type="text" name="title"><br><input type="text" name="body">
            <input type="submit" value="Submit">
        </form>
    </div>
@endsection
