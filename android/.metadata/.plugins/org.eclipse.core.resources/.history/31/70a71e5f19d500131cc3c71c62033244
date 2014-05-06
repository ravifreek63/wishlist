package com.example.wishlist1;

import android.os.Bundle;
import android.app.Activity;
import android.content.Intent;
import android.view.Menu;
import android.view.View;

public class MainActivity extends Activity {
	public final static String param_email = "param_email";
	
	private String mEmail;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        Intent intent = getIntent();
        mEmail = intent.getStringExtra(param_email);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }
    
    public void onAddWishButtonClicked(View view) {
    	Intent intent = new Intent(this, NewWishActivity.class);
 //   	intent.putExtra(NewWishActivity.param_email, mEmail);
		startActivity(intent);
    }
    
    public void onViewWishlistButtonClicked(View view) {
    	Intent intent = new Intent(this, WishlistActivity.class);
		startActivity(intent);
    }
    
}
