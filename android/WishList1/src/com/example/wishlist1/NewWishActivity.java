package com.example.wishlist1;

import org.json.JSONException;
import org.json.JSONObject;

import android.net.ConnectivityManager;
import android.os.AsyncTask;
import android.os.Bundle;
import android.app.Activity;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.EditText;
import android.support.v4.app.NavUtils;
import android.annotation.TargetApi;
import android.content.Context;
import android.content.Intent;
import android.os.Build;

public class NewWishActivity extends Activity {
	public final static String param_email = "param_email";

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_new_wish);
		// Show the Up button in the action bar.
		setupActionBar();
	}

	/**
	 * Set up the {@link android.app.ActionBar}, if the API is available.
	 */
	@TargetApi(Build.VERSION_CODES.HONEYCOMB)
	private void setupActionBar() {
		if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB) {
			getActionBar().setDisplayHomeAsUpEnabled(true);
		}
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.new_wish, menu);
		return true;
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		switch (item.getItemId()) {
		case android.R.id.home:
			// This ID represents the Home or Up button. In the case of this
			// activity, the Up button is shown. Use NavUtils to allow users
			// to navigate up one level in the application structure. For
			// more details, see the Navigation pattern on Android Design:
			//
			// http://developer.android.com/design/patterns/navigation.html#up-vs-back
			//
			NavUtils.navigateUpFromSameTask(this);
			return true;
		}
		return super.onOptionsItemSelected(item);
	}

	public void onCancelButtonClicked(View view) {
		finish();
	}
	
	public void onAddButtonClicked(View view) {
		EditText editTextWishIdea = (EditText) findViewById(R.id.editTextWishIdea);
		String wishName = editTextWishIdea.getText().toString();
		EditText editTextWishDescription = (EditText) findViewById(R.id.editTextWishDescription);
		String wishDescription = editTextWishDescription.getText().toString();
		Intent intent = getIntent();
		String userEmail = intent.getStringExtra(param_email);
		new PostNewWishTask().execute(new NewWishPost(userEmail,wishName,wishDescription));
	}
	
	private class NewWishPost extends HttpPost.SendableObject {
		private String userEmail;
		private String wishName;
		private String wishDescription;
		public NewWishPost(String _userEmail, String _wishName, String _wishDescription) {
			url = "http://ec2-54-186-87-220.us-west-2.compute.amazonaws.com:3000/mobile/addWish/";
			userEmail = _userEmail;
			wishName = _wishName;
			wishDescription = _wishDescription;
		}
		public String toJSON() {
			JSONObject obj = new JSONObject();
			try {
				obj.put("userEmail", userEmail);
				obj.put("wishName", wishName);
				obj.put("wishDescription", wishDescription);
			} catch (JSONException e) {
				e.printStackTrace();
			}
			return obj.toString();
		}
	}
	
	private class PostNewWishTask extends AsyncTask<NewWishPost, Void, String> {
		@Override
		protected String doInBackground(NewWishPost... posts) {
			ConnectivityManager cm = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
			NewWishPost newWishPost = posts[0];
			return HttpPost.post(newWishPost,cm);
		}
		@Override
		protected void onPostExecute(String response) {
			// Check if there was an error in transmission.
			if (response == HttpPost.ERROR) {
				// TODO: Notify user that there was a connection error.
				return;
			}
			Log.d("tatewty",response);
			finish();
		}
	}
}
