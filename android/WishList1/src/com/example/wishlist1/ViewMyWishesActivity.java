package com.example.wishlist1;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.net.ConnectivityManager;
import android.os.AsyncTask;
import android.os.Bundle;
import android.app.Activity;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.TextView;
import android.support.v4.app.NavUtils;
import android.annotation.TargetApi;
import android.content.Context;
import android.content.Intent;
import android.os.Build;

public class ViewMyWishesActivity extends Activity {
	public final static String param_email = "param_email";
	
	private String mEmail;
	private TextView mWishlistTextView;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_view_my_wishes);
		// Show the Up button in the action bar.
		setupActionBar();
		
		Intent intent = getIntent();
        mEmail = intent.getStringExtra(param_email);
        
        mWishlistTextView = (TextView) findViewById(R.id.wishlistTextView);
        
        //TODO: Show a progress indicator.
        WishlistRequestPost post = new WishlistRequestPost(mEmail);
        WishlistRequestTask task = new WishlistRequestTask();
        task.execute(post);
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
		getMenuInflater().inflate(R.menu.view_my_wishes, menu);
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

	
	// Perhaps this should be an interface instead. "implements postable"
	private class WishlistRequestPost extends HttpPost.SendableObject {
		private String email;
		public WishlistRequestPost(String _email){
			url = "http://ec2-54-186-87-220.us-west-2.compute.amazonaws.com:3000/mobile/getWishList/";
			email = _email;
		}
		public String toJSON() {
			JSONObject obj = new JSONObject();
			try {
				obj.put("email", email);
			} catch (JSONException e) {
				e.printStackTrace();
			}
			return obj.toString();
		}
	}
	
	public class WishlistRequestTask extends AsyncTask<WishlistRequestPost, Void, String> {
		@Override
		protected String doInBackground(WishlistRequestPost... posts) {
			ConnectivityManager cm = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
			// Attempt to log in.
			WishlistRequestPost post = posts[0];
			return HttpPost.post(post, cm);
		}

		@Override
		protected void onPostExecute(final String response) {
			Boolean success = false;
			
			// Check if there was an error in transmission.
			if (response == HttpPost.ERROR) {
				// TODO: Notify user that there was a connection error.
				return;
			}
			
			JSONArray items;
			try {
				JSONObject obj = new JSONObject(response);
				Log.d("tatewty",obj.toString());
				// TODO: The strings in the following line should be in an xml file.
				String resultStatus = (String) obj.get("status");
				success = resultStatus.equalsIgnoreCase("Success.");
				items = obj.getJSONArray("wishes");
				if (success) {
					mWishlistTextView.setText(items.getString(0));
				}
			} catch (JSONException e) {
				e.printStackTrace();
			}
		}
	}
}
